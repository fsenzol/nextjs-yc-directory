import {defineQuery} from "groq";

export const STARTUP_QUERY = defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || category match $search || author->name match $search || title match $search] {
    _id,
        title,
        slug,
        _createdAt,
        author -> {
            _id,
                name,
                image,
                bio
        },
        views,
        description,
        image,
        category
} | order(_createdAt desc)`);


export const STARTUP_BY_ID = defineQuery(`

*[_type == "startup" && defined(slug.current) && _id == $id ][0] {
  _id, 
    title, 
    slug, 
    _createdAt, 
    author -> {
      _id,
      name, 
      image,
      bio,
      username
    },
    views, 
    description, 
    image, 
    category,
    pitch
}

`);

export const STARTUP_ID_QUERY_VIEWS = defineQuery(`
*[_type == "startup" && _id == $id ][0] {
_id,
views
}`)

export const AUTHOR_BY_GITHUB_ID = defineQuery(`
    *[_type == "author" && id == $id ][0] {
        _id,
        id,
        username,
        name,
        email,
        image,
        bio
    }
`)

export const AUTHOR_BY_ID = defineQuery(`
    *[_type == "author" && _id == $id ][0] {
        _id,
        id,
        username,
        name,
        email,
        image,
        bio
    }
`)

export const STARTUP_BY_ID_QUERY = defineQuery(`*[_type == "startup" && author._ref == $id ] {
    _id,
        title,
        slug,
        _createdAt,
        author -> {
            _id,
                name,
                image,
                bio
        },
        views,
        description,
        image,
        category
} | order(_createdAt desc)`);


export const PLAYLIST_BY_SLUG_QUERY =
    defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    views,
    description,
    category,
    image,
    pitch
  }
}`);