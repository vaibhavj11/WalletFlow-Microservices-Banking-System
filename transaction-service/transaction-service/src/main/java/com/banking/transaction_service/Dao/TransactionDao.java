package com.banking.transaction_service.Dao;

import com.banking.transaction_service.Model.Transaction;
import com.banking.transaction_service.Repository.TransactionRepository;
import com.banking.transaction_service.Service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionDao implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public Transaction saveTransactions(Transaction transaction) {
        transaction.setCreatedAt(LocalDateTime.now());
        return transactionRepository.save(transaction);
    }

    @Override
    public List<Transaction> getAllTransactions(Long userId) {
        return transactionRepository.findByFromUserIdOrToUserId(userId,userId);
    }
}
