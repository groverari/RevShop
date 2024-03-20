package dev.grover.RevShop.DTO;

import java.util.Objects;

public class UserIdDTO {
    private Integer user_id;

    public UserIdDTO() {
    }

    public UserIdDTO(Integer user_id) {
        this.user_id = user_id;
    }

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserIdDTO userIdDTO = (UserIdDTO) o;
        return Objects.equals(user_id, userIdDTO.user_id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user_id);
    }
}
