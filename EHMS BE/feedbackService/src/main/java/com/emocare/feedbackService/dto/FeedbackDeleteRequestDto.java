package com.emocare.feedbackService.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;


@Data
public class FeedbackDeleteRequestDto {
    @NotBlank(message = "mandatory field !!")
    private long id;
}
