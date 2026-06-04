import Image from 'next/image';

interface PropertyHeaderImageProps {
  image: string;
}

const PropertyHeaderImage = ({ image }: PropertyHeaderImageProps) => {
  console.log('Rendering PropertyHeaderImage with image:', image);
  return (
    <section>
      <div className='container-xl m-auto'>
        <div className='grid grid-cols-1'>
          <Image
            src={
              image.indexOf('http') !== -1 ? image : (`/images/properties/${image}` || image)
            }
            alt=''
            className='object-cover h-[400px] w-full'
            width={0}
            height={0}
            sizes='100vw'
            priority={true}
          />
        </div>
      </div>
    </section>
  );
};
export default PropertyHeaderImage;
