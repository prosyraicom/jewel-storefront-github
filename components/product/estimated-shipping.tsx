"use client";

export function EstimatedShipping() {
  return (
    <div
      className="estimated-shipping__text my-4 py-2 text-black"
      data-dynamic-date="true"
      data-text="<p>🎁 Order in the <strong>next 15 minutes </strong>and get a <strong>FREE Welcome Gift </strong>with your purchase.</p>"
      data-min-days="4"
      data-max-days="6"
    >
      <p className="text-center">
        🎁 Order in the <strong>next 15 minutes </strong>
        and get a <strong>FREE Welcome Gift </strong>with your purchase.
      </p>
    </div>
  );
}
