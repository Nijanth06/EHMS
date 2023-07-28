package com.patient.service;


import com.patient.entity.RefreshToken;

import com.patient.repository.UserCredentialRepository;
import com.patient.repository.RefreshTokenRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenService {

  private Long refreshTokenDurationMs=9000000L;
  private static final Logger logger = LoggerFactory.getLogger(JwtService.class);
  @Autowired
  private RefreshTokenRepository refreshTokenRepository;

  @Autowired
  private UserCredentialRepository userRepository;


  public Optional<RefreshToken> findByToken(String token) {
    System.out.printf("hh");
    logger.error("refresh finde token {}");
    return refreshTokenRepository.findByToken(token);
  }

  public RefreshToken createRefreshToken(int userId) {

    RefreshToken refreshToken = new RefreshToken();

    refreshToken.setUser(userRepository.findById(userId).get());
    refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDurationMs));
    refreshToken.setToken(UUID.randomUUID().toString());

    refreshToken = refreshTokenRepository.save(refreshToken);
    return refreshToken;
  }

  public RefreshToken verifyExpiration(RefreshToken token) {
    if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
      refreshTokenRepository.delete(token);
      throw new RuntimeException("Refresh token was expired. Please make a new signin request" );
    }

    return token;
  }

  @Transactional
  public int deleteByUserId(int userId) {
    return refreshTokenRepository.deleteByUser(userRepository.findById(userId).get());
  }
}
