export default function DropCollection({
  params,
}: {
  params: { chainId: string; collectionAddress: string }
}) {
  console.log('drop collection params', { params })

  return (
    <>
      <div className='border border-red-500'>{JSON.stringify(params)}</div>
    </>
  )
}
