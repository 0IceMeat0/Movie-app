function cutTitle(title) {
  const arr = title.split(' ', 4);
  if (title.split(' ') <= 5) {
    return title;
  }
  return `${arr.join(' ')}...`;
}

function cutDescription(description, numberOfWords) {
  const arr = description.split(' ', numberOfWords);
  if (description.length <= 120) return description;
  return `${arr.join(' ')}...`;
}



export { cutTitle, cutDescription };