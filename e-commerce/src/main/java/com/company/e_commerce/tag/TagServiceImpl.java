package com.company.e_commerce.tag;

import java.util.List;

import org.springframework.stereotype.Service;

import com.company.e_commerce.expection.BadRequestException;
import com.company.e_commerce.expection.ResourceNotFoundException;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;

    @Override
    public TagResponse create(TagRequest request) {

        if (tagRepository.existsByNameIgnoreCase(request.getName())) {
            throw new BadRequestException("Tag already exists");
        }

        Tag tag = new Tag();
        tag.setName(request.getName());

        return map(tagRepository.save(tag));
    }

    @Override
    public TagResponse update(Long id, TagRequest request) {

        Tag tag = tagRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Tag not found"));

        tag.setName(request.getName());
        return map(tag);
    }

    @Override
    public void delete(Long id) {

        Tag tag = tagRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Tag not found"));

        tagRepository.delete(tag);
    }

    @Override
    public List<TagResponse> getAll() {
        return tagRepository.findAll()
            .stream()
            .map(this::map)
            .toList();
    }

    @Override
    public TagResponse getById(Long id) {

        Tag tag = tagRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Tag not found"));

        return map(tag);
    }

    private TagResponse map(Tag tag) {
        return new TagResponse(tag.getId(), tag.getName());
    }
}
