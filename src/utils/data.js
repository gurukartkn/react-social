export const categories = [
  {
    name: "cars",
    image:
      "https://i.pinimg.com/750x/eb/47/44/eb4744eaa3b3ccd89749fa3470e2b0de.jpg",
  },
  {
    name: "fitness",
    image:
      "https://i.pinimg.com/236x/25/14/29/251429345940a47490cc3d47dfe0a8eb.jpg",
  },
  {
    name: "websites",
    image:
      "https://i.pinimg.com/750x/66/b1/29/66b1296d36598122e6a4c5452b5a7149.jpg",
  },
  {
    name: "others",
    image:
      "https://i.pinimg.com/236x/2e/63/c8/2e63c82dfd49aca8dccf9de3f57e8588.jpg",
  },
];

export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    postedBy->{
      _id,
      username,
      image
    },
   save[]{
      postedBy->{
        _id,
        username,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        username,
        image
      },
    }
  }`;
  return query;
};

export const pinDetailMorePinQuery = (pin) => {
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      username,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        username,
        image
      },
    },
  }`;
  return query;
};

export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == '${userId}']`;

  return query;
};

export const searchQuery = (searchTerm) => {
  const query = `*[_type == "pin" && title match '${searchTerm}' || category match '${searchTerm}' || about match '${searchTerm}']{
        image {
            asset -> {
                url
            }
        },
        _id, 
        destination,
        postedBy -> {
            _id,
            username,
            image
        },
        save[] {
            _key,
            postedBy -> {
                _id,
                username,
                image
            },
        },
    }`;

  return query;
};

export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
    image {
        asset -> {
            url
        }
    },
    _id, 
    destination,
    postedBy -> {
        _id,
        username,
        image
    },
    save[] {
        _key,
        postedBy -> {
            _id,
            username,
            image
        },
    },
}`;

export const userCreatedPinsQuery = (userId) => {
  const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      username,
      image
    },
    save[]{
      postedBy->{
        _id,
        username,
        image
      },
    },
  }`;
  return query;
};

export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      username,
      image
    },
    save[]{
      postedBy->{
        _id,
        username,
        image
      },
    },
  }`;
  return query;
};
