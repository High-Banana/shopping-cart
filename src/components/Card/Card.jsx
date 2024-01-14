/* eslint-disable react/prop-types */
export default function Card({ smartPhoneDetails }) {
  return (
    <div className="grid grid-cols-2">
      {smartPhoneDetails.map((phones) => {
        return (
          <div key={phones.id} className="w-[300px] h-[300px]">
            <img src={phones.imgSource} className="h-full w-full object-fit" />
          </div>
        );
      })}
    </div>
  );
}
