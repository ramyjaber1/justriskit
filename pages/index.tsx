import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import {sanityClient,urlFor} from '../sanity'
import {Post} from '../typings'

interface Props{
  posts:[Post]
}

export default function Home({posts}:Props) {
  console.log(posts)
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>Medium 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <div className="flex items-center justify-between border-y border-black bg-yellow-400 py-10 lg:py-0">
        <div className="space-y-5 px-10">
          <h1 className="max-w-xl font-serif text-6xl">
            <span className="underline decoration-black decoration-4">
              Medium
            </span>
            is a Place to write, read, and connect
          </h1>
          <h2>
            It's easy and frtee to post your thinking on any topic and connect
            with millions of readers.{' '}
          </h2>
        </div>
        <img
          className="hidden h-32 md:inline-flex lg:h-full"
          src={
            'https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png'
          }
          alt=""
        />
      </div>

      {/* Posts */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:grap-6 p-2 md:p-6'>
        {posts.map(post => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className='border rounded-lg group cursor-pointer overflow-hidden'>
              <img className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out' src={urlFor(post.mainImage).url()!} alt="" />
              <div className='flex w-full py-3 px-2 bg-white'>
                <div className='flex w-full items-center justify-between'>
                  <p className='text-md md:text-lg font-bold'>{post.title}</p>
                  <p className='text-xs'>{post.description} by {post.author.name}</p>
                  <img className='h-12 w-12  rounded-full' src={urlFor(post.author.image).url()!} alt="" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}


export const getServerSideProps = async() => {
  const query = `*[_type   == "post"]{
    _id,
    title,
    author -> {
      name,
      image
    },
    description,
    mainImage,
    slug
  }`;
  const posts = await sanityClient.fetch(query)

  return {
    props:{
      posts,
    }
  }
} 


