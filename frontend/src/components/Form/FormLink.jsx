import { CardLink } from "react-bootstrap";

function FormLink({ text, href, className }) {
  return (
    <div className={className ? `${className} text-center` : "text-center"}>
      <CardLink className="small" href={href}>
        {text}
      </CardLink>
    </div>
  );
}

export default FormLink;
