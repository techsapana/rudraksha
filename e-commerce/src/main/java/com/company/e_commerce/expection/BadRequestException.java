package com.company.e_commerce.expection;

public class BadRequestException extends RuntimeException{
	public BadRequestException(String message) {
		super(message);
	}
}


