package com.ebook.ebook.repository;

import com.ebook.ebook.entity.UserPro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserProRepository extends JpaRepository<UserPro,Integer> {

    @Query(value = "from UserPro where username=:username and password=:password")
    UserPro checkUser(@Param("username") String username,@Param("password") String password);

    @Query(value = "from UserPro where userType=0")
    List<UserPro> checkUserType();
}
