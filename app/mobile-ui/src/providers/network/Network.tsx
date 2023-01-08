import * as React from "react";
import axios from "axios";
import dayjs from "dayjs";

import { createContext } from "react";
import { isDesktop, prepareExercise, saveId } from "../../bridge";
import { ExerciseResultDto, HistoryDto, WeekDayDto } from "../../dtos";
import { ExerciseDto } from "../../dtos/Exercise";
import { useExercise } from "../exercise";
import { useId } from "../id";
import { useLoading } from "../loading";
import { useOverview } from "../overview";
import { NetworkContextValue, NetworkProviderProps } from "./Network.types";

import {
  REQUEST_EXERCISE_HISTORY_URL,
  REQUEST_EXERCISE_URL,
  REQUEST_NEW_ID_URL,
  REQUEST_STARS_URL,
  SEND_EXERCISE_RESULT_URL,
} from "../../url";
import { CreateIdResponse, ResponseDto } from "../../dtos/ResponseDto";

export const NetworkContext = createContext<NetworkContextValue | null>(null);

export const NetworkProvider = ({ children }: NetworkProviderProps) => {
  const { setIsGeneralLoading, setIsSectionLoading } = useLoading();
  const { currentExercise, setExercise, setExerciseHistory, onExerciseResult } = useExercise();
  const { setSelectedWeekDay } = useOverview();
  const { id, setId, setStars } = useId();

  const [hasNetwork, setHasNetwork] = React.useState(true);

  const handleEnsureId = React.useCallback((): Promise<string> => {
    return new Promise((resolve) => {
      if (id != null) {
        return resolve(id);
      }

      handleRequestId(resolve);
    })
  }, [id]);


  const handleRequestId = React.useCallback((cb?: (next: string) => void) => {
    setHasNetwork(true);
    setIsGeneralLoading(true);
    axios.post(REQUEST_NEW_ID_URL).then((response: CreateIdResponse) => {
      const next = response.data.id;
      saveId(next);
      setIsGeneralLoading(false);
      setId(next, () => cb(next));
    }).catch((e: any) => {
      setIsGeneralLoading(false);
      setHasNetwork(false);
    });
  }, [id, setId]);

  const handleRequestStars = React.useCallback((id: string, cb?: VoidFunction) => {
    setHasNetwork(true);
    axios.post(REQUEST_STARS_URL, { id }).then((response: ResponseDto<string>) => {
      setStars(response.data);
      cb && cb();
    }).catch(() => {
      setHasNetwork(false);
    });
  }, []);

  const handleRequestExercise = React.useCallback((id: string, cb?: VoidFunction) => {
    window.requestExercise = () =>
      setHasNetwork(true);

      axios.post(REQUEST_EXERCISE_URL, { id }).then((response: ResponseDto<ExerciseDto>) => {
        setIsGeneralLoading(false);
        setExercise(response.data);
        cb && cb();
      }).catch(() => {
        setIsGeneralLoading(false);
        setExercise(null);
        setHasNetwork(false);
      });;

      prepareExercise();
      setIsGeneralLoading(true);
      
      isDesktop() && window.requestExercise();
  }, []);

  const handleRequestExerciseHistory = React.useCallback(
    (day: WeekDayDto, id: string, cb?: VoidFunction) => {

      setSelectedWeekDay(day);
      setIsGeneralLoading(false);
      setIsSectionLoading(true);

      const timestamp = (day.exactDate as any).unix(); 
      axios.post(REQUEST_EXERCISE_HISTORY_URL, { id, timestamp }).then((response: ResponseDto<HistoryDto[]>) => {
        setExerciseHistory(response.data || []);
        setIsSectionLoading(false);
        cb && cb();
      }).catch(() => {
        setExerciseHistory([]);
        setIsGeneralLoading(false);
        setIsSectionLoading(false);
        setHasNetwork(false);
      });
    },
    [],
  );

  const handleSendExerciseResult = React.useCallback(
    (exerciseId: string, solutionId: string, id: string, cb?: VoidFunction) => {
      setHasNetwork(true);
      setIsGeneralLoading(true);

      axios.post(SEND_EXERCISE_RESULT_URL, { exerciseId, solutionId, id }).then((response: ResponseDto<ExerciseResultDto>) => {
        onExerciseResult(response.data);
        setIsGeneralLoading(false);
        cb && cb();
      }).catch(() => {
        setIsGeneralLoading(false);
        setHasNetwork(false);
      });
    },
    [currentExercise, onExerciseResult],
  );

  React.useEffect(() => {
    window.receivedNetworkUpdate = (next: boolean) => setHasNetwork(next);
  }, [setHasNetwork])

  return (
    <NetworkContext.Provider
      value={{
        hasNetwork,
        setHasNetwork,
        onEnsureId: handleEnsureId,
        onRequestId: handleRequestId,
        onRequestStars: handleRequestStars,
        onRequestExercise: handleRequestExercise,
        onRequestExerciseHistory: handleRequestExerciseHistory,
        onSendExerciseResult: handleSendExerciseResult,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
};
