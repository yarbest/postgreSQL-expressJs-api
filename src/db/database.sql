create TABLE person
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  surname VARCHAR(255)
);

create TABLE post
(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  content VARCHAR(255),
  person_id INTEGER,
  FOREIGN KEY (person_id) REFERENCES person(id)
);



