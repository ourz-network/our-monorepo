import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import web3 from "@/app/web3";
import DetailedPie from "@/components/Charts/DetailedPie";

const NewSplit = () => {
  const Router = useRouter();
  const { address, newProxy } = web3.useContainer(); // Global State

  const [ownerData, setOwnerData] = useState({
    account: address,
    name: "",
    role: "",
    shares: 100,
  });

  const [nickname, setNickname] = useState();

  const [chartData, setChartData] = useState([{ name: "Creator", shares: 100 }]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  /**
   *  react-hook-form
   *  Handles NewSplit.js' dynamic form fields (the "Add Another Split" button).
   *  A bit overkill for the rest of the form, but the easiest way to achieve
   *  live-updating fields & charts, AFAIK.
   */
  const { control, register, setValue, getValues, handleSubmit, watch } = useForm({
    mode: "all",
  });
  // https://react-hook-form.com/api/usefieldarray/
  const { fields, append, remove } = useFieldArray({
    control,
    name: "splits",
  });
  // Live updates for pie chart
  const watchSplits = watch("splits");
  const controlledFields = fields.map((field, index) => ({
    ...field,
    ...watchSplits[index],
  }));
  // on 'Add Another'
  const onAppend = () => {
    append({ account: "", name: "", role: "", shares: 0 });
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    updateChart();
  };
  const calculateOwnerShares = () => {
    const totalSplits = controlledFields.reduce(
      (accumulator, index) => accumulator + Number(index.shares),
      0
    );
    ownerData.shares = 100 - totalSplits;
  };

  /**
   *  recharts
   *  Visualizes splits as pie charts.
   */
  // createSplit.js is passed this function as a prop and used for dynamic fields onBlur event.
  const updateChart = () => {
    calculateOwnerShares();

    const newChartData = controlledFields.flatMap((split) => ({
      name: `${split.name || split.account}`,
      shares: Number(split.shares),
    }));
    newChartData.unshift({
      name: `${ownerData.name.length > 0 ? ownerData.name : ownerData.account}`,
      shares: ownerData.shares,
    });
    setChartData(newChartData);
  };

  const onSubmit = async () => {
    setLoading(true);
    const splitData = controlledFields;
    splitData.unshift(ownerData);
    const proxyAddress = await newProxy(
      controlledFields, // received as 'splitData'
      nickname // received as 'splitData'
    );

    if (proxyAddress) {
      Router.push(`/create/mint/${proxyAddress}`);
      // setLoading(false);
    }
  };

  const submitSplits = async () => {
    // handleSplits();
    // const newProxy = await onSubmit();
    await onSubmit();
  };

  return (
    <div className="flex flex-row content-center place-content-center w-full h-full bg-dark-background">
      <div className="flex flex-col px-4 py-4 mt-12 w-full h-auto" id="splits">
        <div className="flex justify-center w-full" id="graphs">
          <div className="flex flex-col justify-center w-1/2 text-center">
            <p className="font-semibold text-dark-primary">Splits</p>
            <p className="text-dark-secondary">
              Fill out the form below for everyone
              <br />
              that you would like to credit in your Split.
              <br />
              <br />
              Funds received by the contract, like NFT sales and royalties,
              <br />
              will be claimable by the Split Recipients, up to their allocated amount.
            </p>
          </div>
          <div className="mx-auto -my-32 w-full max-w-500px">
            <DetailedPie chartData={chartData} secondaryBool={false} />
          </div>
        </div>
        <form className="justify-center -mt-1 w-full text-center">
          <label htmlFor="nickname" className="mr-2 text-dark-primary">
            Nickname for Split:
            <input
              type="text"
              id="splitNickname"
              name="nickname"
              placeholder="Nickname"
              onChange={(e) => setNickname(e.target.value)}
            />
          </label>
          <div className="flex flex-col justify-center w-full border-b">
            <ul className="flex z-10 flex-col mt-4 w-full">
              <li className="flex flex-nowrap justify-center mx-auto mb-3 space-x-3 w-full">
                <input
                  type="text"
                  id="ownerAddress"
                  name="address"
                  defaultValue={address}
                  placeholder="Please 'Connect Wallet' before continuing."
                  className="p-3 w-1/3 text-sm border shadow border-dark-border"
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
                  className="p-3 w-1/4 text-sm border shadow border-dark-border min-w-1/4"
                />
                <input
                  type="text"
                  id="ownerRole"
                  name="role"
                  placeholder="Your Role / Description"
                  value={ownerData.role}
                  onChange={handleChange}
                  onBlur={updateChart}
                  className="p-3 w-1/4 text-sm border shadow border-dark-border min-w-1/4"
                />
                <input
                  type="number"
                  id="ownerShare"
                  name="shares"
                  value={ownerData.shares}
                  className="p-3 w-14 text-sm border shadow appearance-none border-dark-border"
                  disabled
                />
                <button
                  type="button"
                  onClick={onAppend}
                  className="px-5 py-3 w-auto whitespace-nowrap border shadow transition duration-200 text-dark-primary bg-dark-background hover:ring-4 hover:ring-yellow-500"
                >
                  Add Split
                </button>
              </li>
              {controlledFields.map((field, index) => (
                <li
                  key={field.id}
                  className="flex flex-nowrap justify-center pt-3 mx-auto mb-3 space-x-3 w-full border-t border-dark-border"
                >
                  <input
                    name={`splits.${index}.address`}
                    type="text"
                    placeholder="Ethereum Address 0x00..."
                    defaultValue={field.account}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register(
                      `splits.${index}.account`,
                      { required: true },
                      {
                        validate: (value) => ethers.utils.isAddress(value) === true,
                      }
                    )}
                    onBlur={updateChart}
                    className="p-3 w-1/3 h-auto text-sm border shadow border-dark-border"
                  />
                  <input
                    name={`splits.${index}.name`}
                    type="text"
                    placeholder="Collaborator Name / Alias"
                    defaultValue={field.name}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register(`splits.${index}.name`)}
                    onBlur={updateChart}
                    className="p-3 w-auto text-sm border shadow border-dark-border min-w-1/4"
                  />
                  <input
                    name={`splits.${index}.role`}
                    type="text"
                    placeholder="Role / Description"
                    defaultValue={field.role}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register(`splits.${index}.role`)}
                    onBlur={updateChart}
                    className="p-3 w-auto text-sm border shadow border-dark-border min-w-1/4"
                  />
                  <input
                    name={`splits.${index}.shares`}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register(`splits.${index}.shares`, {
                      required: true,
                      min: 0,
                      max: 100,
                    })}
                    type="number"
                    defaultValue={field.shares}
                    placeholder="%"
                    className="p-3 w-14 text-sm border shadow appearance-none border-dark-border"
                    onBlur={updateChart}
                    // disabled={`index` ? 0 : "true"}
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="px-6 py-3 text-white border shadow transition duration-200 bg-dark-background hover:ring-4 hover:ring-ourange-500"
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
            type="submit"
          >
            Create New Split Contract
          </button>
        </div>
        <p className="mt-3 text-center text-dark-secondary">
          *Note*: This transaction will only create the Split Contract that is able to mint NFTs.
          <br />
          You will still have to make a separate transaction after this, if you want to mint an NFT.
        </p>
      </div>
    </div>
  );
};

export default NewSplit;
