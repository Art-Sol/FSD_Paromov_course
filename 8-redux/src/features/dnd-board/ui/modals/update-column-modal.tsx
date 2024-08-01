import { UiButton } from "@/shared/ui/ui-button";
import { UiModal } from "@/shared/ui/ui-modal";
import { Controller, useForm } from "react-hook-form";
import { UiTextField } from "@/shared/ui/ui-text-field";
import { useAppSelector } from "@/shared/lib/redux";
import { boardStore } from "../../model/board.store";
import { useBoardActions } from "../../model/use-board-actions";

export function UpdateColumnModal({
  onClose,
  columnId,
}: {
  columnId: string;
  onClose: () => void;
}) {
  const column = useAppSelector((s) =>
    boardStore.selectors.selectColumn(s, columnId),
  );
  const { updateColumn } = useBoardActions();

  const { control, handleSubmit } = useForm<{ title: string }>({
    defaultValues: {
      title: column?.title,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await updateColumn({ title: data.title, id: columnId });
    onClose();
  });

  return (
    <UiModal isOpen onClose={onClose} width="md">
      <form onSubmit={onSubmit} className="flex flex-col grow">
        <UiModal.Header>
          <h1>Добавление колонки</h1>
        </UiModal.Header>
        <UiModal.Body className="flex flex-col gap-4">
          <Controller
            control={control}
            name="title"
            rules={{ required: "Название колонки - обязательное поле" }}
            render={({ field, fieldState }) => (
              <UiTextField
                label="Название"
                inputProps={{ ...field }}
                error={fieldState.error?.message}
              />
            )}
          />
        </UiModal.Body>
        <UiModal.Footer>
          <UiButton type="button" variant="outlined" onClick={onClose}>
            Отмена
          </UiButton>
          <UiButton type="submit" variant="primary">
            Обновить
          </UiButton>
        </UiModal.Footer>
      </form>
    </UiModal>
  );
}