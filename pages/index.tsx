import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic';

/**
 * only available on client side for wallet connection
 */
const Button = dynamic(()=>import('../components/Home/Button'),{
  ssr: false
})

const Home: NextPage = () => {
  return (
    <>
      <h1>nextjs eth generator</h1>
      <Button />
    </>
  )
}

export default Home
