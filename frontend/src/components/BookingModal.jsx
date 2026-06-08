import React, { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function BookingModal({ isOpen, onClose, selectedTier }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [tier, setTier] = useState('discovery');

  const [emailError, setEmailError] = useState(false);
  const [step, setStep] = useState('form'); // 'form', 'payment', 'success'
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi', 'card'
  const [upiId, setUpiId] = useState('');
  const [upiError, setUpiError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiError, setApiError] = useState('');
  const [orderId, setOrderId] = useState('');
  const [source, setSource] = useState('instagram');
  const [orderData, setOrderData] = useState(null);

  // Card mock states
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Sync states when modal opens
  useEffect(() => {
    if (isOpen) {
      setTier(selectedTier || 'discovery');
      setStep('form');
      setIsProcessing(false);
      setName('');
      setEmail('');
      setPhone('');
      setEmailError(false);
      setPaymentMethod('upi');
      setUpiId('');
      setUpiError('');
      setCardNumber('');
      setCardExpiry('');
      setCardCvv('');
      setApiError('');
      setOrderId('');
      setSource('instagram');
      setOrderData(null);
    }
  }, [isOpen, selectedTier]);

  if (!isOpen) return null;

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Email verification
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
    setIsProcessing(true);
    setApiError('');

    if (tier === 'discovery') {
      try {
        const response = await fetch(`${API_BASE_URL}/api/leads`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            source: source,
          }),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.message || 'Failed to submit call booking.');
        }

        setStep('success');
      } catch (err) {
        setApiError(err.message || 'Unable to connect to the server. Please try again.');
      } finally {
        setIsProcessing(false);
      }
    } else {
      const amount = tier === 'basic' ? 299 : 1298;
      try {
        const response = await fetch(`${API_BASE_URL}/api/payment/create-order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            amount: amount,
          }),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.message || 'Failed to initialize payment order.');
        }

        const data = await response.json();
        setOrderId(data.orderId);
        setOrderData(data);
        setStep('payment');
      } catch (err) {
        setApiError(err.message || 'Unable to connect to the server. Please try again.');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handlePaymentSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!upiId.trim()) {
      setUpiError('Please enter your UPI ID to proceed.');
      return;
    }

    setIsProcessing(true);
    setApiError('');

    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      setApiError('Razorpay Checkout SDK failed to load. Please check your internet connection.');
      setIsProcessing(false);
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder',
      amount: Math.round(orderData.amount * 100),
      currency: orderData.currency || 'INR',
      name: 'Lemon Academia',
      description: getTierTitle(),
      image: '/images/logo.png',
      order_id: orderData.orderId,
      handler: async function (paymentResponse) {
        setIsProcessing(true);
        setApiError('');
        try {
          const verifyResponse = await fetch(`${API_BASE_URL}/api/payment/verify`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              orderId: paymentResponse.razorpay_order_id || orderData.orderId,
              paymentId: paymentResponse.razorpay_payment_id,
            }),
          });

          if (!verifyResponse.ok) {
            const errData = await verifyResponse.json().catch(() => ({}));
            throw new Error(errData.message || 'Payment verification failed.');
          }

          setStep('success');
        } catch (err) {
          setApiError(err.message || 'Payment verification failed.');
        } finally {
          setIsProcessing(false);
        }
      },
      prefill: {
        name: name.trim(),
        email: email.trim(),
        contact: phone.trim(),
        method: 'upi',
        vpa: upiId.trim()
      },
      theme: {
        color: '#8e4e00',
      },
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (paymentFailedResponse) {
        setApiError(paymentFailedResponse.error.description || 'Payment transaction failed.');
      });
      rzp.open();
    } catch (err) {
      setApiError('Failed to initialize Razorpay checkout popup.');
    } finally {
      setIsProcessing(false);
    }
  };

  const getTierPrice = () => {
    if (tier === 'basic') return '₹299';
    if (tier === 'advanced') return '₹1298';
    return 'Free';
  };

  const getTierTitle = () => {
    if (tier === 'basic') return 'Basic Course (4 Days)';
    if (tier === 'advanced') return 'Advanced Course (12 Days)';
    return 'Discovery Consultation Call';
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-background/40 backdrop-blur-sm transition-opacity"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="glass-card w-full max-w-lg p-8 rounded-3xl relative transition-all transform scale-100 opacity-100 duration-300"
        onClick={(e) => e.stopPropagation()} // Prevent close on modal body click
      >
        <button
          onClick={onClose}
          disabled={isProcessing}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition-colors disabled:opacity-30"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-[28px]">close</span>
        </button>

        {/* STEP 1: LEAD FORM */}
        {step === 'form' && (
          <div id="form-content">
            <h3 id="modal-title" className="font-display-lg text-headline-md text-on-surface mb-2">Reserve Your Spot</h3>
            <p className="text-body-md text-on-surface-variant mb-6">Enter your details below to schedule your call or enroll in the workshop.</p>

            {apiError && (
              <div className="p-4 mb-4 bg-error-container text-on-error-container rounded-2xl text-sm font-semibold flex items-start gap-3 border border-error/20 animate-fadeIn">
                <span className="material-symbols-outlined text-[20px] shrink-0 text-error">error</span>
                <span>{apiError}</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-on-surface-variant mb-1">Full Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  disabled={isProcessing}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-60"
                  placeholder="Amara Singh"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-on-surface-variant mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  required
                  disabled={isProcessing}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 bg-surface border rounded-xl focus:outline-none focus:ring-1 transition-all disabled:opacity-60 ${emailError ? 'border-error ring-error focus:border-error focus:ring-error' : 'border-outline-variant/30 focus:border-primary focus:ring-primary'}`}
                  placeholder="amara@example.com"
                />
                {emailError && (
                  <span id="email-error" className="block text-xs text-error mt-1">Please enter a valid email address.</span>
                )}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-on-surface-variant mb-1">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  required
                  disabled={isProcessing}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-60"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label htmlFor="course-tier" className="block text-sm font-semibold text-on-surface-variant mb-1">Select Course Path</label>
                <select
                  id="course-tier"
                  disabled={isProcessing}
                  value={tier}
                  onChange={(e) => setTier(e.target.value)}
                  className="w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-60"
                >
                  <option value="discovery">Book a Call (Free)</option>
                  <option value="basic">Basic Course (4 Days - ₹299)</option>
                  <option value="advanced">Advanced Course (12 Days - ₹1298)</option>
                </select>
              </div>
              <div>
                <label htmlFor="source" className="block text-sm font-semibold text-on-surface-variant mb-1">Where did you hear about us?</label>
                <select
                  id="source"
                  disabled={isProcessing}
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-60"
                >
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                  <option value="youtube">YouTube</option>
                  <option value="google">Google Search</option>
                  <option value="friends">Friends / Family</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full mt-6 bg-primary text-on-primary py-4 rounded-full font-label-md text-label-md btn-primary-shadow hover:scale-102 transition-all flex items-center justify-center gap-2 disabled:opacity-75 disabled:hover:scale-100"
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {tier === 'discovery' ? 'Submitting Booking...' : 'Creating Order...'}
                  </>
                ) : (
                  tier === 'discovery' ? 'Submit Booking' : 'Continue to Payment'
                )}
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: SECURE CHECKOUT SUMMARY */}
        {step === 'payment' && (
          <div id="payment-content">
            <h3 className="font-display-lg text-headline-md text-on-surface mb-2">Secure Checkout</h3>
            <p className="text-body-md text-on-surface-variant mb-6">Complete your payment securely using Razorpay. Supports UPI, Cards, Netbanking, and Wallets.</p>

            {apiError && (
              <div className="p-4 mb-4 bg-error-container text-on-error-container rounded-2xl text-sm font-semibold flex items-start gap-3 border border-error/20 animate-fadeIn">
                <span className="material-symbols-outlined text-[20px] shrink-0 text-error">error</span>
                <span>{apiError}</span>
              </div>
            )}

            {/* Purchase Summary */}
            <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/20 mb-6 space-y-4">
              <div className="flex justify-between items-center border-b border-outline-variant/10 pb-4">
                <div>
                  <p className="text-xs text-on-surface-variant uppercase tracking-wider">Item Selected</p>
                  <p className="font-semibold text-on-surface text-base">{getTierTitle()}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-on-surface-variant uppercase tracking-wider">Total Price</p>
                  <p className="font-bold text-primary text-xl">{getTierPrice()}</p>
                </div>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Name:</span>
                  <span className="font-semibold text-on-surface">{name}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Email:</span>
                  <span className="font-semibold text-on-surface">{email}</span>
                </div>
                {orderId && (
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Order Reference:</span>
                    <span className="font-mono text-on-surface">{orderId}</span>
                  </div>
                )}
              </div>
            </div>

            {/* UPI ID Entering Space */}
            <div className="mb-6">
              <label htmlFor="upi-id" className="block text-sm font-semibold text-on-surface-variant mb-1">UPI ID (VPA)</label>
              <input
                type="text"
                id="upi-id"
                required
                disabled={isProcessing}
                value={upiId}
                onChange={(e) => {
                  setUpiId(e.target.value);
                  if (e.target.value.trim()) setUpiError('');
                }}
                className={`w-full px-4 py-3 bg-surface border rounded-xl focus:outline-none focus:ring-1 transition-all disabled:opacity-60 ${upiError ? 'border-error ring-error focus:border-error focus:ring-error' : 'border-outline-variant/30 focus:border-primary focus:ring-primary'}`}
                placeholder="username@upi"
              />
              {upiError && (
                <span className="block text-xs text-error mt-1">{upiError}</span>
              )}
              <p className="text-xs text-on-surface-variant/70 mt-1.5">Enter your UPI ID to directly launch your UPI payment options inside the secure checkout overlay.</p>
            </div>

            <button
              onClick={handlePaymentSubmit}
              disabled={isProcessing}
              className="w-full bg-primary text-on-primary py-4 rounded-full font-label-md text-label-md btn-primary-shadow hover:scale-102 transition-all flex items-center justify-center gap-2 disabled:opacity-75 disabled:hover:scale-100"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Checkout...
                </>
              ) : (
                `Pay ${getTierPrice()} with Razorpay`
              )}
            </button>

            <button
              type="button"
              disabled={isProcessing}
              onClick={() => setStep('form')}
              className="w-full text-center text-xs font-bold text-on-surface-variant hover:text-primary transition-colors py-4 disabled:opacity-30"
            >
              Go Back to Details
            </button>
          </div>
        )}

        {/* STEP 3: SUCCESS OR CONFIRMATION SCREEN */}
        {step === 'success' && (
          <div id="success-content" className="text-center py-8">
            <div className="w-16 h-16 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-[40px]">check_circle</span>
            </div>

            {tier === 'discovery' ? (
              <>
                <h3 className="font-display-lg text-headline-md text-on-surface mb-2">Call Booked!</h3>
                <p className="text-body-md text-on-surface-variant mb-6">
                  Thank you, <span className="font-bold">{name}</span>. We have scheduled your consulting slot. A validation confirmation has been sent to <span className="font-semibold">{email}</span>.
                </p>
              </>
            ) : (
              <>
                <h3 className="font-display-lg text-headline-md text-on-surface mb-2">Enrollment Confirmed!</h3>
                <p className="text-body-md text-on-surface-variant mb-6">
                  Payment of <span className="font-bold text-primary">{getTierPrice()}</span> received. Welcome to <span className="font-semibold">Lemon Academia</span>, <span className="font-bold">{name}</span>! Your course onboarding credentials and material lists have been sent to <span className="font-semibold">{email}</span>.
                </p>

                {orderId && (
                  <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/20 mb-6 text-left max-w-sm mx-auto space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant font-medium">Order ID:</span>
                      <span className="font-mono font-bold text-on-surface select-all">{orderId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant font-medium">Status:</span>
                      <span className="text-tertiary font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-tertiary inline-block"></span>
                        Verified
                      </span>
                    </div>
                  </div>
                )}
              </>
            )}

            <button onClick={onClose} className="bg-primary text-on-primary px-8 py-3 rounded-full font-label-md text-label-md btn-primary-shadow hover:scale-105 transition-all">
              Return to Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
