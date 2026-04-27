package com.banking.wallet_service.Service;

import com.banking.wallet_service.Model.Wallet;

import java.math.BigDecimal;

public interface WalletService {
    Wallet createWallet(Long userId);

    BigDecimal getBalance(Long userId);

    Wallet deposit(Long userId, BigDecimal amount);

    void transfer(Long fromUserId, Long toUserId, BigDecimal amount);
}
