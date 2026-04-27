package com.banking.transaction_service.Repository;

import com.banking.transaction_service.Model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction,Integer> {

    List<Transaction> findByFromUserIdOrToUserId(Long fromUserId, Long toUserId);



}
