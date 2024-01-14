import { useEffect, useState } from "react";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [image, setImage] = useState("");
  useEffect(() => {
    // fetchApi();
  }, []);
  return (
    <>
      <div className="grid grid-rows-3 w-[100%] justify-center items-start">
        <section className="grid grid-cols-2">
          <div className="pl-[20px] flex flex-col pt-[100px] gap-[40px]">
            <h1 className="text-5xl font-[400]">
              <span className="font-[500]">Welcome to</span>
              <br />
              <span className="font-bold text-8xl ml-[30px]">Fake Store,</span>
              <br />
              <span className="">your complete electronics store.</span>
            </h1>
            <p>
              Check out the latest released laptop <span className="font-bold">ASUS Zenbook Duo UX482</span>. ZenBook Duo not only
              gives you a more comfortable typing experience, but cooling and audio performance are also enhanced. Hurry up and
              check it out!
            </p>
            <Button title="SHOP NOW" bgColour="bg-[#4163FD]" width="w-[30%]" />
          </div>
          <img src="src/assets/images/ux482-2.png" alt="ASUS Zenbook Duo UX482" />
        </section>
        <section className="grid grid-cols-2">
          <img src="src/assets/images/homepage-headphone.png" alt="Coloured headphone" />
          <div className="flex px-[50px] pt-[100px] flex-col gap-[40px]">
            <h1 className="text-5xl">
              Be <span className="font-bold">Electronic</span>
            </h1>
            <div className="flex flex-col gap-[40px] ">
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam quod soluta cum nihil expedita iste ipsum, sint
                pariatur a repellendus, nostrum itaque perspiciatis magni! Ab atque neque pariatur labore accusamus!
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, asperiores. Dolores delectus, consectetur fugit quo
                voluptas deserunt totam labore reiciendis tempora! Aut nam ut illo consequuntur. Laboriosam in eius consequatur
                quod reiciendis eum similique, architecto at porro, ipsa odio possimus!
              </p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, ducimus?</p>
              <div className="text-center">
                <Button title="QUICK BUY" bgColour="bg-[#FF5733]" width="w-[30%]" />
              </div>
            </div>
          </div>
        </section>
        <section className="flex mt-[100px] mx-[20px]">
          <div className="flex flex-col gap-[10px] pt-[100px] w-full">
            <div className="flex flex-col pt-[50px] gap-[10px]">
              <p className="text-[20px]">Hurry up and pre-order!</p>
              <h1 className="text-5xl">
                SMARTPHONES FOR <span className="font-bold">FUTURE</span>
              </h1>
            </div>
            <span className="bg-[#212121] w-full h-[5px]"></span>
          </div>
          <Link
            className="bg-[#212121] bg-[url('src/assets/images/homepage-iphone9.jpg')] w-[30rem] h-[30rem] bg-[length:100%] bg-center bg-no-repeat duration-[0.3s] transition-all hover:bg-[length:90%]"
            to=""
          ></Link>
        </section>
      </div>
    </>
  );
}
