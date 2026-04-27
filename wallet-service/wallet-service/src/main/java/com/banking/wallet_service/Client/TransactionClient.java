package com.banking.wallet_service.Client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.banking.wallet_service.dto.Transaction;

@FeignClient(name = "transaction-service")
public interface TransactionClient {

    @PostMapping("/api/transactions/save")
    Transaction saveTransactions(@RequestBody Transaction transaction);

}
