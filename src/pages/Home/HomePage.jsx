import { useEffect, useState } from "react";
import Button from "../../components/ui/Button";

export default function HomePage() {
  const [image, setImage] = useState("");
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/electronics")
      .then((res) => res.json())
      .then((json) => {
        // console.log(json);
        // console.log(json);
      });
  }, []);
  return (
    <>
      <div className="grid grid-cols-2 w-[100%] justify-center items-start">
        <div className="pl-[20px] flex flex-col pt-[100px] gap-[40px]">
          <h1 className="text-5xl font-[400]">
            Welcome to <span className="font-bold text-6xl">Fake Store</span>, get your favorite items in the lowest price with
            highest ratings.
          </h1>
          <p>
            Check out the latest released laptop <span className="font-bold">ASUS Zenbook Duo UX482</span>. ZenBook Duo not only
            gives you a more comfortable typing experience, but cooling and audio performance are also enhanced. Hurry up and
            check it out!
          </p>
          <Button title="SHOP NOW" bgColour="bg-[#4163FD]" width="w-[30%]" />
        </div>
        <div className="flex justify-center">
          <img src="src/assets/images/ux482-2.png" alt="ASUS Zenbook Duo UX482"></img>
        </div>
      </div>
    </>
  );
}
