package com.banking.wallet_service.Dao;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.banking.wallet_service.Client.TransactionClient;
import com.banking.wallet_service.dto.Transaction;
import com.banking.wallet_service.Model.Wallet;
import com.banking.wallet_service.Repository.WalletRepository;
import com.banking.wallet_service.Service.WalletService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WalletDao implements WalletService {

    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    private TransactionClient transactionClient;

    @Override
    public Wallet createWallet(Long userId) {

        walletRepository.findByUserId(userId).ifPresent(w -> {throw new RuntimeException("Wallet Already Exists");});

        Wallet wallet = new Wallet();
        wallet.setUserId(userId);
        wallet.setBalance(BigDecimal.ZERO);
        wallet.setCreatedAt(LocalDateTime.now());
        wallet.setUpdatedAt(LocalDateTime.now());

        return walletRepository.save(wallet);
    }

    @Override
    public BigDecimal getBalance(Long userId) {

        Wallet wallet = walletRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("Wallet not found !"));

        return wallet.getBalance();
    }

    @Override
    public Wallet deposit(Long userId, BigDecimal amount) {

        if(amount.compareTo(BigDecimal.ZERO) <= 0){
            throw new RuntimeException("Invalid Amount !");
        }

        Wallet wallet = walletRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("Wallet not found !"));

        wallet.setBalance(wallet.getBalance().add(amount));
        wallet.setUpdatedAt(LocalDateTime.now());

        walletRepository.save(wallet);

        Transaction txn = new Transaction();
        txn.setToUserId(userId);
        txn.setAmount(amount);
        txn.setType("DEPOSIT");
        txn.setStatus("SUCCESS");

        transactionClient.saveTransactions(txn);

        return wallet;
    }

    @Transactional
    @Override
    public void transfer(Long fromUserId, Long toUserId, BigDecimal amount) {

        Wallet fromWallet = walletRepository.findByUserId(fromUserId).orElseThrow(() -> new RuntimeException("Wallet from which you are transfering amount not found !"));

        Wallet toWallet = walletRepository.findByUserId(toUserId).orElseThrow(() -> new RuntimeException("Wallet thaat you want to transfer the amount not found !"));

        if (fromWallet.getBalance().compareTo(amount) <= 0){
            throw new RuntimeException("Insufficient amount !");
        }

        fromWallet.setBalance(fromWallet.getBalance().subtract(amount));
        toWallet.setBalance(toWallet.getBalance().add(amount));
        fromWallet.setUpdatedAt(LocalDateTime.now());
        toWallet.setUpdatedAt(LocalDateTime.now());

        walletRepository.save(fromWallet);
        walletRepository.save(toWallet);

        Transaction txn = new Transaction();
        txn.setFromUserId(fromUserId);
        txn.setToUserId(toUserId);
        txn.setAmount(amount);
        txn.setType("TRANSFER");
        txn.setStatus("SUCCESS");

        transactionClient.saveTransactions(txn);

    }


}
