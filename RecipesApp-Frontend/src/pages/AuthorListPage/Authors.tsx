import AuthorCard from "../../components/AuthorCard/AuthorCard";
import NavbarAuthor from "../../components/Home-Author/NavbarAuthor";
import { Author } from "../../models/Author";
import "./authors-list.css";

interface Props {
  authors: Author[];
}

const Authors: React.FC<Props> = ({ authors }) => {
  return (
    <div className="author-list-page">
      <NavbarAuthor />
      <div className="author-list-container">
        {authors.map((author) => (
          <AuthorCard author={author} key={author.id} />
        ))}
      </div>
    </div>
  );
};

export default Authors;
