const StreamingLinks = ({ links }) => {
  return (
    <div className="p-2 bg-white rounded shadow mt-2">
      <h3 className="text-md font-bold">Watch on:</h3>
      <ul className="list-disc ml-5 mt-1">
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.url} className="text-blue-600 underline" target="_blank" rel="noreferrer">
              {link.platform}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StreamingLinks;
