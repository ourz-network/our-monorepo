// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class NFTContract extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save NFTContract entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save NFTContract entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("NFTContract", id.toString(), this);
    }
  }

  static load(id: string): NFTContract | null {
    return changetype<NFTContract | null>(store.get("NFTContract", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get splitNFTs(): Array<string> {
    let value = this.get("splitNFTs");
    return value!.toStringArray();
  }

  set splitNFTs(value: Array<string>) {
    this.set("splitNFTs", Value.fromStringArray(value));
  }
}

export class SplitNFT extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("tokenId", Value.fromString(""));
    this.set("contract", Value.fromString(""));
    this.set("creator", Value.fromString(""));
    this.set("transactionHash", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save SplitNFT entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save SplitNFT entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("SplitNFT", id.toString(), this);
    }
  }

  static load(id: string): SplitNFT | null {
    return changetype<SplitNFT | null>(store.get("SplitNFT", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get tokenId(): string {
    let value = this.get("tokenId");
    return value!.toString();
  }

  set tokenId(value: string) {
    this.set("tokenId", Value.fromString(value));
  }

  get contract(): string {
    let value = this.get("contract");
    return value!.toString();
  }

  set contract(value: string) {
    this.set("contract", Value.fromString(value));
  }

  get creator(): string {
    let value = this.get("creator");
    return value!.toString();
  }

  set creator(value: string) {
    this.set("creator", Value.fromString(value));
  }

  get transactionHash(): string {
    let value = this.get("transactionHash");
    return value!.toString();
  }

  set transactionHash(value: string) {
    this.set("transactionHash", Value.fromString(value));
  }
}

export class ERC20Transfer extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("recipient", Value.fromString(""));
    this.set("transactionHash", Value.fromString(""));
    this.set("contract", Value.fromString(""));
    this.set("amount", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ERC20Transfer entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save ERC20Transfer entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("ERC20Transfer", id.toString(), this);
    }
  }

  static load(id: string): ERC20Transfer | null {
    return changetype<ERC20Transfer | null>(store.get("ERC20Transfer", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get recipient(): string {
    let value = this.get("recipient");
    return value!.toString();
  }

  set recipient(value: string) {
    this.set("recipient", Value.fromString(value));
  }

  get transactionHash(): string {
    let value = this.get("transactionHash");
    return value!.toString();
  }

  set transactionHash(value: string) {
    this.set("transactionHash", Value.fromString(value));
  }

  get contract(): string {
    let value = this.get("contract");
    return value!.toString();
  }

  set contract(value: string) {
    this.set("contract", Value.fromString(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }
}

export class OurProxy extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("transactionHash", Value.fromString(""));
    this.set("createdAtTimestamp", Value.fromBigInt(BigInt.zero()));
    this.set("createdAtBlockNumber", Value.fromBigInt(BigInt.zero()));
    this.set("proxyOwners", Value.fromStringArray(new Array(0)));
    this.set("creator", Value.fromString(""));
    this.set("transfers", Value.fromBigInt(BigInt.zero()));
    this.set("ETH", Value.fromBigInt(BigInt.zero()));
    this.set("needsIncremented", Value.fromBoolean(false));
    this.set("splitRecipients", Value.fromStringArray(new Array(0)));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save OurProxy entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save OurProxy entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("OurProxy", id.toString(), this);
    }
  }

  static load(id: string): OurProxy | null {
    return changetype<OurProxy | null>(store.get("OurProxy", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get nickname(): string | null {
    let value = this.get("nickname");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set nickname(value: string | null) {
    if (!value) {
      this.unset("nickname");
    } else {
      this.set("nickname", Value.fromString(<string>value));
    }
  }

  get transactionHash(): string {
    let value = this.get("transactionHash");
    return value!.toString();
  }

  set transactionHash(value: string) {
    this.set("transactionHash", Value.fromString(value));
  }

  get createdAtTimestamp(): BigInt {
    let value = this.get("createdAtTimestamp");
    return value!.toBigInt();
  }

  set createdAtTimestamp(value: BigInt) {
    this.set("createdAtTimestamp", Value.fromBigInt(value));
  }

  get createdAtBlockNumber(): BigInt {
    let value = this.get("createdAtBlockNumber");
    return value!.toBigInt();
  }

  set createdAtBlockNumber(value: BigInt) {
    this.set("createdAtBlockNumber", Value.fromBigInt(value));
  }

  get proxyOwners(): Array<string> {
    let value = this.get("proxyOwners");
    return value!.toStringArray();
  }

  set proxyOwners(value: Array<string>) {
    this.set("proxyOwners", Value.fromStringArray(value));
  }

  get creator(): string {
    let value = this.get("creator");
    return value!.toString();
  }

  set creator(value: string) {
    this.set("creator", Value.fromString(value));
  }

  get transfers(): BigInt {
    let value = this.get("transfers");
    return value!.toBigInt();
  }

  set transfers(value: BigInt) {
    this.set("transfers", Value.fromBigInt(value));
  }

  get ETH(): BigInt {
    let value = this.get("ETH");
    return value!.toBigInt();
  }

  set ETH(value: BigInt) {
    this.set("ETH", Value.fromBigInt(value));
  }

  get needsIncremented(): boolean {
    let value = this.get("needsIncremented");
    return value!.toBoolean();
  }

  set needsIncremented(value: boolean) {
    this.set("needsIncremented", Value.fromBoolean(value));
  }

  get splitRecipients(): Array<string> {
    let value = this.get("splitRecipients");
    return value!.toStringArray();
  }

  set splitRecipients(value: Array<string>) {
    this.set("splitRecipients", Value.fromStringArray(value));
  }

  get creations(): Array<string> {
    let value = this.get("creations");
    return value!.toStringArray();
  }

  set creations(value: Array<string>) {
    this.set("creations", Value.fromStringArray(value));
  }
}

export class User extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("ethClaimed", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save User entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save User entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("User", id.toString(), this);
    }
  }

  static load(id: string): User | null {
    return changetype<User | null>(store.get("User", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get ethClaimed(): BigInt {
    let value = this.get("ethClaimed");
    return value!.toBigInt();
  }

  set ethClaimed(value: BigInt) {
    this.set("ethClaimed", Value.fromBigInt(value));
  }

  get ownedProxies(): Array<string> {
    let value = this.get("ownedProxies");
    return value!.toStringArray();
  }

  set ownedProxies(value: Array<string>) {
    this.set("ownedProxies", Value.fromStringArray(value));
  }

  get createdProxies(): Array<string> {
    let value = this.get("createdProxies");
    return value!.toStringArray();
  }

  set createdProxies(value: Array<string>) {
    this.set("createdProxies", Value.fromStringArray(value));
  }

  get recipientInfo(): Array<string> {
    let value = this.get("recipientInfo");
    return value!.toStringArray();
  }

  set recipientInfo(value: Array<string>) {
    this.set("recipientInfo", Value.fromStringArray(value));
  }
}

export class SplitRecipient extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("user", Value.fromString(""));
    this.set("splitProxy", Value.fromString(""));
    this.set("name", Value.fromString(""));
    this.set("role", Value.fromString(""));
    this.set("shares", Value.fromString(""));
    this.set("allocation", Value.fromString(""));
    this.set("claimableETH", Value.fromBigInt(BigInt.zero()));
    this.set("ethClaimed", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save SplitRecipient entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save SplitRecipient entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("SplitRecipient", id.toString(), this);
    }
  }

  static load(id: string): SplitRecipient | null {
    return changetype<SplitRecipient | null>(store.get("SplitRecipient", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get user(): string {
    let value = this.get("user");
    return value!.toString();
  }

  set user(value: string) {
    this.set("user", Value.fromString(value));
  }

  get splitProxy(): string {
    let value = this.get("splitProxy");
    return value!.toString();
  }

  set splitProxy(value: string) {
    this.set("splitProxy", Value.fromString(value));
  }

  get name(): string {
    let value = this.get("name");
    return value!.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get role(): string {
    let value = this.get("role");
    return value!.toString();
  }

  set role(value: string) {
    this.set("role", Value.fromString(value));
  }

  get shares(): string {
    let value = this.get("shares");
    return value!.toString();
  }

  set shares(value: string) {
    this.set("shares", Value.fromString(value));
  }

  get allocation(): string {
    let value = this.get("allocation");
    return value!.toString();
  }

  set allocation(value: string) {
    this.set("allocation", Value.fromString(value));
  }

  get claimableETH(): BigInt {
    let value = this.get("claimableETH");
    return value!.toBigInt();
  }

  set claimableETH(value: BigInt) {
    this.set("claimableETH", Value.fromBigInt(value));
  }

  get ethClaimed(): BigInt {
    let value = this.get("ethClaimed");
    return value!.toBigInt();
  }

  set ethClaimed(value: BigInt) {
    this.set("ethClaimed", Value.fromBigInt(value));
  }
}
