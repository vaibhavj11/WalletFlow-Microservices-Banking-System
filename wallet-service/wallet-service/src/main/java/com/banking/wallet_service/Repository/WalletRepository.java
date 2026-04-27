package com.banking.wallet_service.Repository;

import com.banking.wallet_service.Model.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WalletRepository extends JpaRepository<Wallet, Integer> {


    Optional<Wallet> findByUserId(Long userId);
}
