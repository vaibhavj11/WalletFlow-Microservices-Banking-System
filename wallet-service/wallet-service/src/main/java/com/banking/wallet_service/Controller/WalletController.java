package com.banking.wallet_service.Controller;


import com.banking.wallet_service.Model.Wallet;
import com.banking.wallet_service.Service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/wallet")
public class WalletController {

    @Autowired
    private WalletService walletService;

    @PostMapping("/create/{userId}")
    public Wallet createWallet(@PathVariable Long userId){
        return walletService.createWallet(userId);
    }

    @GetMapping("/balance/{userId}")
    public BigDecimal getBalance(@PathVariable Long userId){
        return walletService.getBalance(userId);
    }

    @PostMapping("/deposit")
    public Wallet deposit(@RequestParam Long userId, @RequestParam BigDecimal amount){
        return walletService.deposit(userId,amount);
    }

    @PostMapping("/transfer")
    public String transfer(@RequestParam Long fromUserId,@RequestParam Long toUserId,@RequestParam BigDecimal amount){

        walletService.transfer(fromUserId,toUserId,amount);

        return "Transfered Successfully !";
    }

}
