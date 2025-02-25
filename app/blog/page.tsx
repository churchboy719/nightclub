import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { gallery } from "@/sanity/schema/gallery";
import Navbar from "../components/Navbar";

// export default async function Gallery() {
// const blog = await client.fetch(groq `*[_type=="gallery"]`);
//     return(
//         <>
//         {blog.map((gallery:any,index:number)=>(
//             <div className="">
//                 <h1 className="justify-self-start relative z-10">{gallery.title}</h1>
//                 <Image src={urlFor(gallery.images && gallery.images[0]).url()} 
//                 alt={gallery.slug}
//                 width={1000}
//                 height={700}
//                 className="object-cover" />
//                 <h3 className="justify-self-end z-10">{gallery.post}</h3>
//             </div>
//         ))}
//         </>
//     );
// }

export default async function Gallery ({ posts }: { posts: { title: string; imageUrl: string; date: string }[] }) {
    const blog = await client.fetch(groq `*[_type=="gallery"]`);
        return(
            <>
            <Navbar />
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
            {blog.map((gallery:any,index:number)=>(
                <div
                key={index}
                className="relative h-[400px] overflow-hidden rounded-lg shadow-lg"
              >
                    
                    <Image src={urlFor(gallery.images && gallery.images[0]).url()} 
                    alt={gallery.slug}
                    layout="fill"
                    objectFit="cover"
                    className="absolute inset-0"
                     />
                    <div className="absolute inset-0 bg-black bg-opacity-50 p-4 flex flex-col justify-end text-white">
              <h2 className="text-xl font-bold mb-2">{gallery.title}</h2>
              <p>{gallery.date}</p>
            </div>
                </div>
            ))}
            </div>
            </>
        );
    }

// const BlogPage = ({ posts }: { posts: { title: string; imageUrl: string; date: string }[] }) => {
//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
//         {posts.map((post, index) => (
//           <div
//             key={index}
//             className="relative h-[400px] overflow-hidden rounded-lg shadow-lg"
//           >
//             <Image
//               src={post.imageUrl}
//               alt={post.title}
//               layout="fill"
//               objectFit="cover"
//               className="absolute inset-0"
//             />
//             <div className="absolute inset-0 bg-black bg-opacity-50 p-4 flex flex-col justify-end text-white">
//               <h2 className="text-xl font-bold mb-2">{post.title}</h2>
//               <p>{post.date}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };