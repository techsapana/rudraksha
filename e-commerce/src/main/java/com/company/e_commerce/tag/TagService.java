package com.company.e_commerce.tag;

import java.util.List;

public interface TagService {

    TagResponse create(TagRequest request);

    TagResponse update(Long id, TagRequest request);

    void delete(Long id);

    List<TagResponse> getAll();

    TagResponse getById(Long id);
}
