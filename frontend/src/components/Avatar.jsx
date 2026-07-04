import React, { useState } from "react";

export default function Avatar({
  initials,
  color,
  online,
  size = "md",
  photo,
}) {
  const [imageError, setImageError] = useState(false);
  const showImage = Boolean(photo) && !imageError;

  return (
    <span
      className={`pa-avatar ${size === "sm" ? "pa-avatar--sm" : ""}`}
      style={{ background: color }}
    >
      {showImage ? (
        <img
          src={photo}
          alt={initials}
          className="pa-avatar__image"
          onError={() => setImageError(true)}
        />
      ) : (
        initials
      )}
    </span>
  );
}
