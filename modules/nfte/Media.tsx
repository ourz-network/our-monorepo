import React, { useEffect, useState, Component, createRef } from "react";
import Image from "next/image";

function Text({ media }: { media: string }) {
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    fetch(media)
      .then((r) => r.text())
      .then((r) => setContent(r));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="nfte__media-content nfte__media-content--text pl1 pr1 pt1 pb1">
      {content}
    </div>
  );
}

function Video({
  media,
  autoPlay,
  calcAspectRatio,
}: {
  media: string;
  autoPlay: boolean;
  calcAspectRatio: () => any;
}) {
  return (
    <video
      className="nfte__media-content"
      muted
      autoPlay={autoPlay}
      controls={!autoPlay}
      loop
      playsInline
      onLoadedMetadata={calcAspectRatio}
    >
      <source src={media} />
    </video>
  );
}

function Audio({ media }: { media: string }) {
  return <audio className="nfte__media-content" controls src={media}></audio>;
}

// class NextImage extends Component {
//   constructor(props) {
//     super(props)
//     this.handleLoad = this.handleLoad.bind(this);
//     this.imageRef = React.createRef();
//   }
//   handleLoad = (e) => this.props.calcAspectRatio(e);

//   render() {
//     return (
//       <div className="relative w-full h-full" ref={this.imageRef}>
//         <Image
//           layout="fill"
//           src={this.props.media}
//           alt="NFT Thumbnail"
//           quality={60}
//           priority={true}
//           objectFit="cover"
//           className="nfte__media-content"
//           onLoadingComplete={this.handleLoad(this.imageRef)}
//         />
//     </div>
//     )
//   }
// }

function NextImage({
  media,
  calcAspectRatio,
}: {
  media: string;
  calcAspectRatio: (loadedMedia) => void;
}) {
  // const handleLoad = (loadedMedia) => {
  //   console.log(`Media.tsx - Image onLoad(event) triggered \nref: `);
  //   calcAspectRatio(loadedMedia);
  // }
  return (
    <div className="relative object-contain w-full h-full">
      <Image
        layout="fill"
        src={media}
        alt="NFT Thumbnail"
        quality={60}
        priority={true}
        objectFit="cover"
        className="nfte__media-content"
        onLoadingComplete={(loadedMedia) => calcAspectRatio(loadedMedia)}
      />
    </div>
  );
}

// // eslint-disable-next-line @next/next/no-img-element
// <img src={media} alt="NFT Thumbnail" className="nfte__media-content" onLoad={(loadedMedia) => calcAspectRatio(loadedMedia)} />
export default function Media({
  media,
  mediaMimeType,
  autoPlay,
  calcAspectRatio,
}: {
  media: string;
  mediaMimeType: string;
  autoPlay: boolean;
  calcAspectRatio: () => any;
  // React.EventHandler<React.SyntheticEvent<HTMLImageElement>> | React.EventHandler<React.SyntheticEvent<HTMLVideoElement>>
}) {
  if (mediaMimeType?.includes("text")) return <Text media={media} />;

  if (mediaMimeType?.includes("video"))
    return (
      <Video
        media={media}
        autoPlay={autoPlay}
        calcAspectRatio={calcAspectRatio}
      />
    );

  if (mediaMimeType?.includes("audio")) return <Audio media={media} />;
  else return <NextImage media={media} calcAspectRatio={calcAspectRatio} />;
}
