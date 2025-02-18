import { AvatarFallback } from "./avatar";

const ShortName = ({ name }:any) => {
  const getInitials = (name : any) => {
    const words = name.trim().split(" ");

    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }

    return (
      words[0].charAt(0).toUpperCase() +
      words[words.length - 1].charAt(0).toUpperCase()
    );
  };

  return <AvatarFallback>{getInitials(name)}</AvatarFallback>;
};

export default ShortName;
