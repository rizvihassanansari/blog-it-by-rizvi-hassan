import React, { useState } from "react";

import { Download } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui";
import postsApi from "apis/posts";
import { POLL_INTERVAL } from "components/Posts/constants";
import { useTranslation } from "react-i18next";

const DownloadAsPdf = ({ slug }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();

  const saveAs = ({ blob, fileName }) => {
    const objectUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = objectUrl;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);

    setTimeout(() => window.URL.revokeObjectURL(objectUrl), 150);
    setIsLoading(false);
  };

  const downloadPdf = async () => {
    const { data } = await postsApi.downloadPdf(slug);
    saveAs({ blob: data, fileName: `${slug}.pdf` });
  };

  const pollForReport = () => {
    let cancelled = false;
    let timeoutId;

    const checkReport = async () => {
      if (cancelled) return;

      try {
        await downloadPdf();
      } catch (error) {
        if (error.response?.status === 404) {
          timeoutId = setTimeout(checkReport, POLL_INTERVAL);

          return;
        }

        setIsLoading(false);
      }
    };

    checkReport();

    return () => {
      cancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
  };

  const generateAndPoll = async () => {
    setIsLoading(true);
    try {
      await postsApi.generatePdf(slug);
      pollForReport();
    } catch (error) {
      logger.error(error);
      setIsLoading(false);
    }
  };

  return (
    <Button
      className="mr-4"
      icon={Download}
      loading={isLoading}
      style="text"
      tooltipProps={{ content: t("labels.downloadAsPdf") }}
      onClick={generateAndPoll}
    />
  );
};

export default DownloadAsPdf;
