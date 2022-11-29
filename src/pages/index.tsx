import { items } from '@prisma/client'
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { ItemModal } from "../components/ItemModal"
import { useState } from "react";
import { motion } from "framer-motion"
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [items, setItems] = useState<items[]>([]);
  const [checkedItems, setCheckedItems] = useState<items[]>([]);

  // add on success function to the query
  const { data: itemsData } = trpc.items.getAll.useQuery({ project: "hej" }, {
    onSuccess: (items) => {
      setItems(items);
      const checked = items.filter((item) => item.checked)
      setCheckedItems(checked)
    }
  });



  const { mutate: checkItem } = trpc.items.checkItem.useMutation({
    onSuccess: (item) => {
      if (checkedItems.some((it) => it.id === item.id)) {
        // 
        setCheckedItems((prev) => prev.filter((prevItem) => prevItem.id !== item.id))
      } else {
        setCheckedItems((prev) => [...prev, item])
      }
    }
  });
  return (
    <>
      <Head>
        <title>Tills nästa vecka</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {showModal && <ItemModal setShowModal={setShowModal} setItems={setItems} />}
      <main className="mx-auto my-12 max-w-6xl ">

        <div className="mt-4 flex justify-between">
          <h1 className="text-3xl text-center font-semibold">Att göra tills nästa vecka</h1>
          <button type="button" onClick={() => setShowModal(true)} className="bg-violet-600 text-gray-50 rounded p-2">Lägg till</button>
        </div>

        <h2 className="text-2xl text-left font-semibold">Admin</h2>
        <ul className='mt-4'>
          {items?.filter((item: items) => item.project == "Admin").map((item: items) => {
            const { id, desc, checked } = item;
            return (
              <li key={item.id} className='flex justify-between items-center'>
                <div className='relative'>
                  <div className='pointer-events-none absolute inset-0 flex origin-left items-center justify-center'>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: checkedItems.some((item) => item.id === id) ? '100%' : 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      className='h-[2px] w-full bg-violet-600' />
                  </div>
                  <span onClick={() => checkItem({ id, checked: !checkedItems.some((item) => item.id === id) })}>{desc}</span>
                </div>
              </li>)
          })}
        </ul>

        <h2 className="text-2xl text-left font-semibold">Web</h2>
        <ul className='mt-4'>
          {items?.filter((item: items) => item.project == "Web").map((item: items) => {
            const { id, desc, checked } = item;
            return (
              <li key={item.id} className='flex justify-between items-center'>
                <span onClick={() => checkItem({ id, checked: !checkedItems.some((item) => item.id === id) })}>{desc}</span>
              </li>)
          })}
        </ul>

        <h2 className="text-2xl text-left font-semibold">Servitör</h2>
        <ul className='mt-4'>
          {items?.filter((item: items) => item.project == "Servitör").map((item: items) => {
            const { id, desc, checked } = item;
            return (
              <li key={id} className='flex justify-between items-center'>
                <span onClick={() => checkItem({ id, checked: !checkedItems.some((item) => item.id === id) })}>{desc}</span>
              </li>)
          })}
        </ul>

        <h2 className="text-2xl text-left font-semibold">Kök</h2>
        <ul className='mt-4'>
          {items?.filter((item: items) => item.project == "Kök").map((item: items) => {
            const { id, desc, checked } = item;
            return (
              <li key={id} className='flex justify-between items-center'>
                <span onClick={() => checkItem({ id, checked: !checkedItems.some((item) => item.id === id) })}>{desc}</span>
              </li>)
          })}
        </ul>
        <h2 className="text-2xl text-left font-semibold">Databas</h2>
        <ul className='mt-4'>
          {items?.filter((item: items) => item.project == "Databas").map((item: items) => {
            const { id, desc, checked } = item;
            return (
              <li key={id} className='flex justify-between items-center'>
                <span onClick={() => checkItem({ id, checked: !checkedItems.some((item) => item.id === id) })}>{desc}</span>
              </li>)
          })}
        </ul>
        <h2 className="text-2xl text-left font-semibold">Schema</h2>
        <ul className='mt-4'>
          {items?.filter((item: items) => item.project == "Schema").map((item: items) => {
            const { id, desc, checked } = item;
            return (
              <li key={id} className='flex justify-between items-center'>
                <span onClick={() => checkItem({ id, checked: !checkedItems.some((item) => item.id === id) })}>{desc}</span>
              </li>)
          })}
        </ul>
      </main>
    </>
  );
};

export default Home;
