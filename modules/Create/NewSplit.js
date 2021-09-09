import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/router";
import web3 from "@/app/web3";
import { ethers } from "ethers";
import PieChartPreview from "@/components/PieChartPreview";

const NewSplit = () => {
  const Router = useRouter();
  const { address, newProxy } = web3.useContainer(); // Global State

  const [ownerData, setOwnerData] = useState({
    account: address,
    name: "",
    role: "",
    shares: 100,
  });

  const [chartData, setChartData] = useState([
    { name: "Creator", shares: 100 },
  ]);

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setOwnerData({
      ...ownerData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (!ownerData.account) {
      ownerData.account = address;
    }
  }, [address]);

  const onSubmit = async () => {
    setLoading(true);
    let splitData = controlledFields;
    splitData.unshift(ownerData);
    // console.log(`splitData \n`, splitData);
    console.log(`calling newProxy in web3..`);
    const proxyAddress = await newProxy(
      controlledFields // received as 'splitData'
    );

    if (proxyAddress) {
      Router.push(`/create/new-mint/${proxyAddress}`);
      // console.log(proxyAddress);
      // setLoading(false);
    }
  };

  /**
   *  react-hook-form
   *  Handles NewSplit.js' dynamic form fields (the "Add Another Split" button).
   *  A bit overkill for the rest of the form, but the easiest way to achieve
   *  live-updating fields & charts, AFAIK.
   */
  const { control, register, setValue, getValues, handleSubmit, watch } =
    useForm({
      mode: "all",
    });
  // https://react-hook-form.com/api/usefieldarray/
  const { fields, append, remove } = useFieldArray({
    control,
    name: "splits",
  });
  // Live updates for pie chart
  const watchSplits = watch("splits");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchSplits[index],
    };
  });
  // on 'Add Another'
  const onAppend = () => {
    append({ account: "", name: "", role: "", shares: 0 });
    updateChart();
  };
  const calculateOwnerShares = () => {
    let totalSplits = controlledFields.reduce(function (accumulator, index) {
      return accumulator + Number(index.shares);
    }, 0);
    ownerData.shares = 100 - totalSplits;
  };

  /**
   *  recharts
   *  Visualizes splits as pie charts.
   */
  // createSplit.js is passed this function as a prop and used for dynamic fields onBlur event.
  const updateChart = () => {
    calculateOwnerShares();
    // console.log(`updateChart() \ncontrolledFields: \n`, controlledFields);

    let newChartData = controlledFields.flatMap((split) => ({
      name: `${split.name || split.account}`,
      shares: Number(split.shares),
    }));
    newChartData.unshift({
      name: `${ownerData.name.length > 0 ? ownerData.name : ownerData.account}`,
      shares: ownerData.shares,
    });
    setChartData(newChartData);
    // console.log("updateChart() \nnewChartData: \n", chartData);
    // console.log("updateChart() \nnewChartData: \n", JSON.stringify(chartData));
  };

  const submitSplits = async () => {
    // handleSplits();
    console.log(`calling onSubmit in NewSplit.....`);
    const newProxy = await onSubmit();
  };

  return (
    <div className="flex flex-row content-center w-full h-full place-content-center bg-dark-background">
      <div className="flex flex-col w-full h-auto px-4 py-4 mt-12 " id="splits">
        <div className="flex justify-center w-full" id="graphs">
          <div className="flex flex-col justify-center w-1/2 text-center">
            <label htmlFor="splits">
              <p className="font-semibold text-dark-primary">Splits</p>
              <p className="text-dark-secondary">
                Fill out the form below for everyone
                <br />
                that you would like to credit in your Split.
                <br />
                <br />
                Funds received by the contract, like NFT sales and royalties,
                <br />
                will be claimable by the Split Recipients, up to their allocated
                amount.
              </p>
            </label>
          </div>
          <div className="w-full mx-auto -my-32 max-w-500px">
            <PieChartPreview chartData={chartData} secondaryBool={false} />
          </div>
        </div>
        <form className="justify-center w-full -mt-1 text-center">
          <div className="flex flex-col justify-center w-full border-b">
            <ul className="z-10 flex flex-col w-full mt-4">
              <li className="flex justify-center w-full mx-auto mb-3 space-x-3 flex-nowrap">
                <input
                  type="text"
                  id="ownerAddress"
                  name="address"
                  defaultValue={address}
                  placeholder="Please 'Connect Wallet' before continuing."
                  className="w-1/3 p-3 text-sm border shadow border-dark-border"
                  disabled
                />
                <input
                  type="text"
                  id="ownerName"
                  name="name"
                  defaultValue={ownerData.name}
                  placeholder="Your Name / Alias"
                  onBlur={updateChart}
                  onChange={handleChange}
                  className="w-1/4 p-3 text-sm border shadow border-dark-border min-w-1/4"
                />
                <input
                  type="text"
                  id="ownerRole"
                  name="role"
                  placeholder="Your Role / Description"
                  value={ownerData.role}
                  onChange={handleChange}
                  onBlur={updateChart}
                  className="w-1/4 p-3 text-sm border shadow border-dark-border min-w-1/4"
                />
                <input
                  type="number"
                  id="ownerShare"
                  name="shares"
                  value={ownerData.shares}
                  className="p-3 text-sm border shadow appearance-none border-dark-border w-14"
                  disabled
                />
                <button
                  type="button"
                  onClick={onAppend}
                  className="w-auto px-5 py-3 transition duration-200 border shadow text-dark-primary bg-dark-background hover:ring-4 whitespace-nowrap hover:ring-yellow-500"
                >
                  Add Split
                </button>
              </li>
              {controlledFields.map((field, index) => (
                <li
                  key={field.id}
                  className="flex justify-center w-full pt-3 mx-auto mb-3 space-x-3 border-t border-dark-border flex-nowrap"
                >
                  <input
                    name={`splits.${index}.address`}
                    type="text"
                    placeholder="Ethereum Address 0x00..."
                    defaultValue={field.account}
                    {...register(
                      `splits.${index}.account`,
                      { required: true },
                      {
                        validate: (value) =>
                          ethers.utils.isAddress(value) == true,
                      }
                    )}
                    onBlur={updateChart}
                    className="w-1/3 h-auto p-3 text-sm border shadow border-dark-border"
                  />
                  <input
                    name={`splits.${index}.name`}
                    type="text"
                    placeholder="Collaborator Name / Alias"
                    defaultValue={field.name}
                    {...register(`splits.${index}.name`)}
                    onBlur={updateChart}
                    className="w-auto p-3 text-sm border shadow border-dark-border min-w-1/4"
                  />
                  <input
                    name={`splits.${index}.role`}
                    type="text"
                    placeholder="Role / Description"
                    defaultValue={field.role}
                    {...register(`splits.${index}.role`)}
                    onBlur={updateChart}
                    className="w-auto p-3 text-sm border shadow border-dark-border min-w-1/4"
                  />
                  <input
                    name={`splits.${index}.shares`}
                    {...register(`splits.${index}.shares`, {
                      required: true,
                      min: 0,
                      max: 100,
                    })}
                    type="number"
                    defaultValue={field.shares}
                    placeholder="%"
                    className="p-3 text-sm border shadow appearance-none border-dark-border w-14"
                    onBlur={updateChart}
                    // disabled={`index` ? 0 : "true"}
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="px-6 py-3 text-white transition duration-200 border shadow bg-dark-background hover:ring-4 hover:ring-ourange-500"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </form>
        <div className="flex justify-center mt-5">
          <button
            className="p-3 border border-dark-border text-dark-primary mainButton"
            onClick={submitSplits}
          >
            Create New Split Contract
          </button>
        </div>
        <p className="mt-3 text-center text-dark-secondary">
          *Note*: This transaction will only create the Split Contract that is
          able to mint NFTs.
          <br />
          You will still have to make a separate transaction after this, if you
          want to mint an NFT.
        </p>
      </div>
    </div>
  );
};

export default NewSplit;
