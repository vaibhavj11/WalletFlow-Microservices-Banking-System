package com.banking.transaction_service.Controller;

import com.banking.transaction_service.Model.Transaction;
import com.banking.transaction_service.Service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService trasactionService;


    @PostMapping("/save")
    public Transaction saveTransaction(@RequestBody Transaction transaction){

        return trasactionService.saveTransactions(transaction);
    }

    @GetMapping("/user/{userId}")
    public List<Transaction> getAllTransactions(@PathVariable Long userId){
        return trasactionService.getAllTransactions(userId);
    }

}
