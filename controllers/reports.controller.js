// 7.1 GET dashboard KPIs
exports.getDashboardKPIs = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      totalRequests: 128,
      openRequests: 34,
      inProgressRequests: 21,
      completedRequests: 73,
      avgRepairTimeHours: 4.6
    }
  });
};

// 7.2 GET requests by team
exports.getRequestsByTeam = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: [
      {
        teamId: 1,
        teamName: 'Production',
        totalRequests: 45,
        completed: 30
      },
      {
        teamId: 2,
        teamName: 'Maintenance',
        totalRequests: 83,
        completed: 43
      }
    ]
  });
};
