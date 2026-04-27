package com.banking.transaction_service.Service;

import com.banking.transaction_service.Model.Transaction;

import java.util.List;

public interface TransactionService {

    Transaction saveTransactions(Transaction transaction);

    List<Transaction> getAllTransactions(Long userId);
}
