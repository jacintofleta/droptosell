import type { GetServerSideProps } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async (context) => {
  const stripeProductId = context.params?.stripeProductId as string;

  const product = await prisma.product.findUnique({
    where: {
      stripeProductId: stripeProductId,
    },
    select: {
      title: true,
      awsFileUrl: true,
      deleted: true,
    },
  });

  if (!product || product.deleted) {
    return {
      notFound: true,
    };
  }

  return {
    props: { product },
  };
};

type Props = {
  product: {
    title: string;
    awsFileUrl: string;
    deleted: boolean;
  };
};

const ThankYou = ({ product }: Props) => {
  return (
    <>
      <div className="flex flex-col h-screen container px-16 lg:px-48 mx-auto pt-12 space-y-16">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex justify-center w-full">
            <h1 className="text-center text-4xl lg:text-6xl font-extrabold">
              Download {product.title}
            </h1>
          </div>
        </div>
        <main>
          <div className="text-center">
            <a
              href={product.awsFileUrl}
              download
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Download file
            </a>
          </div>
        </main>
      </div>
    </>
  );
};

export default ThankYou;
