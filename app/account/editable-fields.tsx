"use client";

import {JSX, useState} from "react";
import { useAuthMutation } from "naystack/graphql/client";
import { UPDATE_USER } from "@/gql/mutations";
import Modal from "../components/modal";
import { useRouter } from "next/navigation";

type EditableFieldProps = {
  label: string;
  value: string;
  fieldKey: string;
  readonly?: boolean;
  disabled?: boolean;
  loading?: boolean;
};

function PencilIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}

function EditModal({ open, onClose, label, value, onSave, loading }: {
  open: boolean;
  onClose: () => void;
  label: string;
  value: string;
  onSave: (value: string) => void;
  loading: boolean;
}) {
  const [inputValue, setInputValue] = useState(value);

  // Sync input when modal opens with a new value
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(inputValue);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-wide">
          Edit {label}
        </h2>
        <button
          onClick={onClose}
          className="text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
        >
          &#10005;
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <label className="mb-1 block font-[family-name:var(--font-body)] text-xs font-bold uppercase tracking-[0.15em] text-[var(--muted)]">
          {label}
        </label>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          required
          className="mb-6 w-full border-2 border-[var(--border)] bg-[var(--surface)] px-4 py-2 font-[family-name:var(--font-body)] text-[var(--foreground)] outline-none focus:border-[var(--accent)]"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full border-2 border-[var(--foreground)] bg-[var(--foreground)] px-6 py-3 font-[family-name:var(--font-body)] text-sm font-bold uppercase tracking-[0.15em] text-white transition-all duration-200 hover:border-[var(--accent)] hover:bg-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "SAVING..." : "SAVE"}
        </button>
      </form>
    </Modal>
  );
}

export function EditableField({ label, value, fieldKey, readonly, disabled, loading: fieldLoading }: EditableFieldProps) {
  const [open, setOpen] = useState(false);
  const [updateUser, { loading }] = useAuthMutation(UPDATE_USER);
  const router = useRouter();

  const handleSave = async (inputValue: string) => {
    await updateUser({ [fieldKey]: inputValue });
    setOpen(false);
    router.refresh();
  };

  return (
    <>
      <div className="border-2 border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-[family-name:var(--font-body)] text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] sm:text-xs">
              {label}
            </span>
            {readonly && (
              <span className="rounded-sm border border-[var(--border)] px-1.5 py-0.5 font-[family-name:var(--font-body)] text-[9px] uppercase tracking-wider text-[var(--muted)]">
                Readonly
              </span>
            )}
          </div>
          {!readonly&&!disabled&&!fieldLoading && (
            <button
              onClick={() => setOpen(true)}
              className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
            >
              <PencilIcon />
            </button>
          )}
        </div>
        {fieldLoading ? (
          <div className="mt-3 h-5 w-40 animate-pulse rounded bg-[var(--border)]" />
        ) : (
          <p className="mt-2 font-[family-name:var(--font-body)] text-base font-medium text-[var(--foreground)] sm:text-lg">
            {value}
          </p>
        )}
      </div>

      <EditModal
        open={open}
        onClose={() => setOpen(false)}
        label={label}
        value={value === "—" ? "" : value}
        onSave={handleSave}
        loading={loading}
      />
    </>
  );
}

export function EditableName({ name, disabled, loading: fieldLoading }: { name: string, disabled?: boolean, loading?: boolean }): JSX.Element {
  const [open, setOpen] = useState(false);
  const [updateUser, { loading }] = useAuthMutation(UPDATE_USER);
  const router = useRouter();

  const handleSave = async (inputValue: string) => {
    await updateUser({ name: inputValue });
    setOpen(false);
    router.refresh();
  };

  return (
    <>
      <div className="flex items-start justify-between">
        {fieldLoading ? (
          <div className="h-9 w-56 animate-pulse rounded bg-[var(--border)] sm:h-10" />
        ) : (
          <p className="font-[family-name:var(--font-display)] text-3xl tracking-tight text-[var(--foreground)] sm:text-4xl">
            {name.toUpperCase()}
          </p>
        )}
        {!disabled&&!fieldLoading&&<button
          onClick={() => setOpen(true)}
          className="mt-1 text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
        >
          <PencilIcon/>
        </button>}
      </div>

      <EditModal
        open={open}
        onClose={() => setOpen(false)}
        label="Name"
        value={name}
        onSave={handleSave}
        loading={loading}
      />
    </>
  );
}
