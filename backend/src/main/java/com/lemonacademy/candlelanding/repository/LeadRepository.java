package com.lemonacademy.candlelanding.repository;

import com.lemonacademy.candlelanding.model.Lead;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeadRepository extends MongoRepository<Lead, String> {
}
