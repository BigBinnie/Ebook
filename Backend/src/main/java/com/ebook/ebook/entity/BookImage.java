package com.ebook.ebook.entity;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.persistence.Id;

@Document(collection = "bookimage")
public class BookImage {
    @Id
    private int id;

    public String getImageBase64() {
        return imageBase64;
    }

    public void setImageBase64(String imageBase64) {
        this.imageBase64 = imageBase64;
    }

    @Field(name="imageBase64")
    private String imageBase64;

    public BookImage(int id,String imageBase64){
        this.id =id;
        this.imageBase64=imageBase64;
    }


}
