function Logo({ tetxColor = "text-indigo-600", textSize = "text-2xl" }) {
  return (
    <h1 className={`font-bold text-indigo-950 ${textSize}`}>
      Dev<span className={`text-indigo-600`}>Space</span>
    </h1>
  );
}

export default Logo;
