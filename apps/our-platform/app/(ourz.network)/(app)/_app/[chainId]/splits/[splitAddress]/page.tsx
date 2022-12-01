export default function SplitOverview({
  params,
}: {
  params: { chainId: string; splitAddress: string }
}) {
  console.log('splitOverview params', { params })

  return (
    <>
      <div className='border border-red-500'>{JSON.stringify(params)}</div>
    </>
  )
}
