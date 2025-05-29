import {
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core'
import { predefinedOption } from '../types/form-question'
import { handleReorder } from '../utils/dnd'
import { v4 as uuid } from 'uuid';
// import { applyNumberOperation } from './optionFunction';

type HandleDragStartParams = {
  event: DragStartEvent;
  setActiveOpt: React.Dispatch<React.SetStateAction<predefinedOption | null>>;
  getOptionById: (id: string) => predefinedOption | undefined;
};

export const handleDragStart = ({
  event,
  setActiveOpt,
  getOptionById,
}: HandleDragStartParams) => {
  const opt = getOptionById(String(event.active.id))
  setActiveOpt(opt ?? null)
}

type HandleDragEndParams = {
  event: DragEndEvent;
  listOptions: predefinedOption[];
  listAnswer: predefinedOption[];
  setListAnswer: React.Dispatch<React.SetStateAction<predefinedOption[]>>;
  setListOptions: React.Dispatch<React.SetStateAction<predefinedOption[]>>;
  setActiveOpt: React.Dispatch<React.SetStateAction<predefinedOption | null>>;
  staticOptions?: boolean;
  showActive?: boolean;
  motionActive?: boolean;
};

export const handleDragEnd = ({
  event,
  listOptions,
  listAnswer,
  setListAnswer,
  setListOptions,
  setActiveOpt,
  staticOptions = false,
  motionActive = false,
}: HandleDragEndParams) => {
  const { active, over } = event
  if (!over) return

  const activeId = String(active.id)
  const overId = String(over.id)

  if (overId === 'options-list' || overId === 'answer-list') {
    const fromOptions = listOptions.some(o => o.id === activeId)
    const fromAnswer = listAnswer.some(o => o.id === activeId)

    if (fromOptions && overId === 'answer-list') {
      const item = listOptions.find(o => o.id === activeId)!
      if (!staticOptions) {
        setListOptions(prev => prev.filter(o => o.id !== activeId))
        setListAnswer(prev => [...prev, item])
      } else {
        setListAnswer(prev => [...prev, item.id ? { ...item, id: uuid() } : item])
        if (motionActive) {
          // setMotionNumber(applyNumberOperation(motionNumber, item))
        }
      }
    } else if (fromAnswer && overId === 'options-list' && !staticOptions) {
      const item = listAnswer.find(o => o.id === activeId)!
      setListAnswer(prev => prev.filter(o => o.id !== activeId))
      setListOptions(prev => [...prev, item])
    }
  } else {
    if (listOptions.some(o => o.id === activeId)) {
      handleReorder<predefinedOption>(event, listOptions, setListOptions)
    } else {
      handleReorder<predefinedOption>(event, listAnswer, setListAnswer)
    }
  }
  setActiveOpt(null)
}