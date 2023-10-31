book_dict = {
    "Book1": "Author1",
    "Book2": "Author2",
    "Book3": "Author3",
}
book_dict["Book4"] = "Author4"
book_dict["Book2"] = "NewAuthor2"
print(book_dict)
for title, author in book_dict.items():
    print(f"Book Title: {title}, Author: {author}")