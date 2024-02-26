import { Box, Stack, Typography } from "@mui/material";
import StatComponent from "../../component/StatComponent";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import WorkIcon from "@mui/icons-material/Work";
import CategoryIcon from "@mui/icons-material/Category";
import { Chart } from "react-google-charts";
import { data, options } from "./data/data";
import ChartComponent from "../../component/ChartComponent";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [jobsAll, setJobsAll] = useState([]);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };
  const [jobData, setJobData] = useState({
    labels: [],
    datasets: [
      {
        label: "Salary",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [],
      },
    ],
  });
  console.log(jobData);
  useEffect(() => {
    const labels = jobsAll.map((job) => job.title);
    const salaries = jobsAll.map((job) => parseFloat(job.salary));

    setJobData({
      ...jobData,
      labels: labels,
      datasets: [
        {
          ...jobData.datasets[0],
          data: salaries,
        },
      ],
    });
  }, [jobsAll]);
  const dispatch = useDispatch();
  const getStats = async () => {
    const res = await axios.get("/api/stats");
    setData(res.data);
  };
  const getAllJobs = async () => {
    const res = await axios.get("/api/jobs/all");
    setJobsAll(res?.data?.data);
  };
  useEffect(() => {
    getStats();
    getAllJobs();
  }, []);
  return (
    <>
      <Box>
        <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
          Dashboard
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <StatComponent
            value={data?.userCount}
            icon={
              <SupervisorAccountIcon sx={{ color: "#fafafa", fontSize: 30 }} />
            }
            description="Users"
            money=""
          />
          <StatComponent
            value={data?.jobCount}
            icon={<WorkIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
            description="Jobs"
            money=""
          />
          <StatComponent
            value={data?.categoryCount}
            icon={<CategoryIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
            description="Jobs categories"
            money=""
          />
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          sx={{ mt: 3 }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <Bar options={options} data={jobData} />
        </Stack>
      </Box>
    </>
  );
};

export default AdminDashboard;
