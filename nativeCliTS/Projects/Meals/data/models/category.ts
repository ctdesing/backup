class Category {
  id: string
  title: string
  color: string
  imageUrl?: string

  constructor(id: string, title: string, color: string, imageUrl: string | undefined = undefined) {
    this.id = id;
    this.title = title;
    this.color = color;
    this.imageUrl = imageUrl
  }
}

export default Category;
